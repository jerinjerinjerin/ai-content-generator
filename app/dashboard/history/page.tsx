import React from 'react';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { currentUser } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';
import HistoryComponent, { HISTORY } from './HistryComponents';

const HistoryPage = async () => {
    const user = await currentUser();

    if (!user || !user.primaryEmailAddress?.emailAddress) {
        return <div>Please log in to view your history.</div>;
    }

    const history = await db
        .select({
            id: AIOutput.id,
            formData: AIOutput.formData,
            aiResponse: AIOutput.aiResponse,
            templateSlug: AIOutput.templateSlug,
            createdBy: AIOutput.createdBy,
            createdAt: AIOutput.createdAt,
        })
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress))
        .orderBy(desc(AIOutput.createdAt));

    const formattedHistory: HISTORY[] = history.map((item) => ({
        id: item.id,
        formData: item.formData,
        aiResponse: item.aiResponse ?? '',
        templateSlug: item.templateSlug,
        createdBy: item.createdBy,
        createdAt: item.createdAt ?? '',
    }));

    return <HistoryComponent history={formattedHistory} />;
};

export default HistoryPage;
