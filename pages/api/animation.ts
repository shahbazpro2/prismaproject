import nextConnect from 'next-connect';
import { NextApiRequest, NextApiResponse } from "next";
import multer from 'multer';
import { PrismaClient } from '@prisma/client';

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req: any, file: { originalname: any; }, cb: (arg0: null, arg1: any) => any) => cb(null, file.originalname),
    }),
});

const uploadMiddleware = upload.array('file');

const apiRoute = nextConnect({
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});
apiRoute.use(uploadMiddleware);


apiRoute.post(async (req: NextApiRequest & { files: any }, res: NextApiResponse) => {
    const { title, description, tags } = req.body
    const formatedTags = JSON.parse(tags)
    console.log('req', req.files, title, description, formatedTags[0])

    const prisma = new PrismaClient()

    try {
        const prisRes = await prisma.animation.create({ data: { tags: { create: formatedTags }, description, title, path: req.files[0].originalname, userId: 1 } })
        console.log('prisRes', prisRes)
    } catch (error) {
        console.log('error', error)
    }

    res.status(200).json({ data: 'success' });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};