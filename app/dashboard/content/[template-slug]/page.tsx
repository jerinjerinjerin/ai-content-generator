"use client";

import React, { useContext, useState } from 'react';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import { TEMPLATE } from '../../_components/TemplateListSection';
import Templates from '@/app/(data)/Templates';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { chatSession } from '@/utils/AiModel';
import { db } from '@/utils/db';
import { useRouter } from 'next/navigation';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';

interface PROPS {
  params: {
    'template-slug': string;
  };
}

const CreateNewContent = (props: PROPS) => {
  const { 'template-slug': templateSlug } = props.params;
  const selectedTemplate: TEMPLATE | undefined = Templates.find((item) => item.slug === templateSlug);

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>('');
  const { user } = useUser();
  const {push} = useRouter();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const{updateCreditUsage, setUpdateCreditUsage} = useContext(UpdateCreditUsageContext);

  const GenerateAIContent = async (formData: any) => {
    if (totalUsage >= 10000 && !userSubscription) {
      push('/dashboard/billing');
      console.log('Please Upgrade');
      return;
    }
    setLoading(true);

    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const finalAIPrompt = JSON.stringify(formData) + ', ' + SelectedPrompt;
    const result = await chatSession.sendMessage(finalAIPrompt);

    const responseText = await result.response.text();
    setAiOutput(responseText);
    await SaveInDb(formData, selectedTemplate?.slug, responseText);
    setLoading(false);
    setUpdateCreditUsage(Date.now())
  };

  const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
    if (!slug || !user?.primaryEmailAddress?.emailAddress) {
      console.error('Slug or user email is undefined');
      return;
    }
    await db.insert(AIOutput).values({
      formData: JSON.stringify(formData),
      templateSlug: slug,
      aiResponse: aiResp || '',
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format('DD/MM/yyyy'),
    });

    console.log('Data saved successfully');
  };

  return (
    <div className="p-10">
      <Link href="/dashboard">
        <Button>
          <ArrowLeft /> Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {/* FormSection */}
        <FormSection selectedTemplate={selectedTemplate} userFormInput={(v: any) => GenerateAIContent(v)} loading={loading} />
        {/* OutputSection */}
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;
