import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const dynamic = 'auto';

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_IAM_BUCKET_REGION ?? "",
    credentials: {
        accessKeyId: process.env.IAM_ACCESS_KEY ?? "",
        secretAccessKey: process.env.IAM_SECRET_ACCESS_KEY ?? "",
    }
});

async function uploadFileToS3(file: Buffer, fileName: string): Promise<string> {
    const params = {
        Bucket: process.env.NEXT_PUBLIC_IAM_BUCKET_NAME ?? "",
        Key: fileName,
        Body: file,
        ContentType: "image/jpeg",
    }

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    return fileName;
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file found" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = await uploadFileToS3(buffer, file.name);

        return NextResponse.json({ success:true, fileName });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : String(error)})
    }
}