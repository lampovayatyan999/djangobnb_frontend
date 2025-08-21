// app/inbox/[id]/page.tsx
import { getUserId } from "@/app/lib/actions";
import React from "react";
import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { UserType } from "../page";
import apiService from "@/app/services/apiService";
import { getAccessToken } from "@/app/lib/actions";

export type MessageType = {
    id: string;
    name: string;
    body: string;
    conversationId: string;
    sent_to: UserType;
    created_by: UserType;  
}

interface PageParams {
    params: Promise<{ id: string }>;
}

const ConversationPage = async ({ params }: PageParams) => {
    const { id } = await params;
    const userId = await getUserId();
    const token = await getAccessToken();
    
    if (!userId || !token) {
        return (
            <main className="max-w-[1500px] max-auto px-6 py-12">
                <p>You need to be authenticated...</p>
            </main>
        );
    }

    const conversation = await apiService.get(`/api/chat/${id}/`);

    return ( 
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <ConversationDetail
                token={token}
                userId={userId}
                messages={conversation.messages}
                conversation={conversation.conversation}
            />
        </main>
    );
}

export default ConversationPage;
