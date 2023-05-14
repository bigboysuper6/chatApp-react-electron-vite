interface verifyInterface {
    groupName: string | undefined;
    recevierId: string;
    type: string;
    content: string;
    name: string;
    time: string;
    roomId: string;
    result: boolean;
    userId: string;
}

interface messages {
    roomId: string;
    content: string;
    userId: string;
    createdAt: string;
}

interface EnvelopeData {
    phoneNumber: string;
    verify: string;
}
