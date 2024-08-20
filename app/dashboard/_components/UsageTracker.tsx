'use client';

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { AIOutput, UserSubscription } from '@/utils/schema'; // Import the table definitions
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { HISTORY } from '../history/HistryComponents';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsageContext } from '@/app/(context)/UpdateCreditUsageContext';

const UsageTracker = () => {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const [maxWords, setMaxWords]=useState(10000)
  const {updateCreditUsage, setUpdateCreditUsage} = useContext(UpdateCreditUsageContext)

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GetData();
    }
  }, [user]);


  useEffect(() => {
   user&&GetData();
  },[updateCreditUsage&&user])

  const GetData = async () => {
    try {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      // Fetching AI Output History
      const result: HISTORY[] = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));

      GetTotalUsage(result);

      // Check User Subscription
      const subscriptionResult = await db
        .select()
        .from(UserSubscription) // Use the table object
        .where(eq(UserSubscription.email, user.primaryEmailAddress.emailAddress)); // Correct field reference
       if(subscriptionResult){
          setUserSubscription(true)
          setMaxWords(1000000)
       }
      if (subscriptionResult.length > 0) {
        setUserSubscription(subscriptionResult[0]);
      } else {
        setUserSubscription(null);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const GetTotalUsage = (result: HISTORY[]) => {
    let total = 0;
    result.forEach((element) => {
      total += Number(element.aiResponse?.length || 0);
    });

    setTotalUsage(total);
    console.log('Total Usage:', total);
  };

  return (
    <div className="m-5">
      <div className="bg-primary p-3 text-white rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: `${(totalUsage / maxWords) * 100}%`,
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">{totalUsage}/{maxWords}Credits Used</h2>
      </div>
      <Button variant={'outline'} className="w-full my-3 text-primary">
        Upgrade
      </Button>
    </div>
  );
};

export default UsageTracker;
