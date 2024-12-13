import { Router } from 'express'
import fsPromises from 'node:fs/promises'
import fs from 'node:fs'

import path from 'node:path'

const router = Router()
type Video = {
    id: string
    title: string
    fileName: string,
    url: string
    thumbnail?: string
    uploadedAt?: string
}
const videos: Video[] = [
    {
        id: '0',
        title: 'Video 1',
        url: '/video/0',
        fileName: '0_1MB.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400',
        uploadedAt: '2024-03-10',
    },
    {
        id: '1',
        title: 'Video 2',
        url: '/video/1',
        fileName: '1_30mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400',
        uploadedAt: '2024-03-10',
    },
    {
        id: '2',
        title: 'Video 3',
        url: '/video/2',
        fileName: '3_5mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400',
        uploadedAt: '2024-03-10',
    }
]

const getVideoDetails = (id: string) => videos.find(video => video.id === id)

const getPath = (fileName: string) => path.resolve(__dirname, '../data', fileName)

const CHUNK_SIZE = 10 ** 6; // 1MB // 1000,000 bytes

router.get('/videos/:id', async (req, res) => {
    const id = req.params.id
    const videoDetails = getVideoDetails(id)
    if (!videoDetails) {
        res.sendStatus(404)
        return
    }


    const videoPath = getPath(videoDetails.fileName);

    return fsPromises.stat(videoPath)
        .then((videoStat) => {
            const fileSize = videoStat.size;
            const videoRange = req.headers.range;
            if (videoRange) {
                const start = Number(videoRange.replace(/\D/g, ""));
                const end = Math.min(start + CHUNK_SIZE, fileSize - 1);
                const contentLength = end - start + 1;

                const readStream = fs.createReadStream(videoPath, { start, end });
                const header = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': contentLength,
                    'Content-Type': 'video/mp4',
                };
                res.writeHead(206, header);
                readStream.pipe(res);
                return
            } else {
                res.status(401).send('range is required');
                return
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send('something went wrong')
        });
})

export default router;