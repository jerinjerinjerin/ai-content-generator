"use client";

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { Button } from '@/components/ui/button';

const Billing = () => {
    const [loading, setLoading] = useState(false);
    const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const { user } = useUser();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => setScriptLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const CreateSubscription = () => {
        setLoading(true);
        axios.post('/api/create-subscription', {})
            .then((response) => {
                console.log(response.data);
                OnPayment(response.data.id);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    const OnPayment = (subId: string) => {
        if (!scriptLoaded) {
            console.error('Razorpay script not loaded yet.');
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            subscription_id: subId,
            name: 'jerin application',
            description: 'Monthly Subscription',
            handler: async (response: any) => {
                if (response) {
                    await SaveSubscription(response.razorpay_payment_id);
                }
                setLoading(false);
            }
        };

        //@ts-ignore
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const SaveSubscription = async (paymentId: string) => {
        const result = await axios.post('/api/save-subscription', {
            email: user?.primaryEmailAddress?.emailAddress,
            userName: user?.fullName,
            active: true,
            paymentId: paymentId,
            joinDate: moment().format('DD/MM/YYYY')
        });
        console.log('result', result.data);
    };

    return (
        <div className="py-5">
            <h1 className='flex justify-center items-center text-center text-2xl font-semibold'>
                Upgrade with monthly plan
            </h1>
            <div className="container grid md:grid-cols-2 grid-cols-1 w-full gap-10 mx-auto p-10 space-y-8 md:space-y-0">
                {/* Free Plan */}
                <div className="border border-gray-300 rounded-lg p-6 py-6 flex flex-col gap-10 items-center text-center">
                    <h2 className="text-2xl font-bold mb-4">Free Plan</h2>
                    <div className="text-lg mb-2 flex items-center">
                        <TickIcon />
                        <span className="ml-2">10,000 words/month</span>
                    </div>
                    <div className="text-lg mb-2 flex items-center">
                        <TickIcon />
                        <span className="ml-2">50+ content templates</span>
                    </div>
                    <div className="text-lg mb-2 flex items-center">
                        <TickIcon />
                        <span className="ml-2">Ultimate download & copy</span>
                    </div>
                    <div className="text-lg mb-4 flex items-center">
                        <TickIcon />
                        <span className="ml-2">1 month of history</span>
                    </div>
                    <Button variant={'outline'} className="w-full">
                        Currently Active Plan
                    </Button>
                </div>

                {/* Monthly Plan */}
                <div className="border border-gray-300 rounded-lg p-6 py-6 flex flex-col gap-10 items-center text-center">
                    <h2 className="text-2xl font-bold mb-1">Monthly Plan</h2>
                    <p className="text-blue-500 text-sm font-semibold mb-4">Upgrade</p>
                    <div className="text-lg mb-2 flex items-center">
                        <TickIcon />
                        <span className="ml-2">100,000 words/month</span>
                    </div>
                    <div className="text-lg mb-2 flex items-center">
                        <TickIcon />
                        <span className="ml-2">50+ content templates</span>
                    </div>
                    <div className="text-lg mb-2 flex items-center">
                        <TickIcon />
                        <span className="ml-2">Ultimate download & copy</span>
                    </div>
                    <div className="text-lg mb-4 flex items-center">
                        <TickIcon />
                        <span className="ml-2">1 year of history</span>
                    </div>
                    <Button 
                        disabled={loading}
                        onClick={CreateSubscription}
                        className="w-full">
                        {loading && <Loader2Icon className='animate-spin' />}
                         {userSubscription ? 'Active Plan': 'Get Started'} 
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Tick Icon Component
const TickIcon = () => (
    <svg
        className="w-6 h-6 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
        ></path>
    </svg>
);

export default Billing;
