import { S3Client, ListObjectsV2Command, HeadObjectCommand, GetObjectCommand, ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';

// Configure S3 client
// const s3Client = new S3Client({
//     endpoint: 'https://ea4b278dc87ae2346b7f5b8f453c97c4.r2.cloudflarestorage.com',
//     credentials: {
//         accessKeyId: '5e8ba1c141cbab5e684cf921464bd6da',
//         secretAccessKey: '9db4448bf2876440102da1b7c9a586b5cb9b6f2638308bd4ad2e04484cfd5695'
//     },
//     region: 'auto'  // Required for Cloudflare R2
// });

//DEV:
const s3Client = new S3Client({
    endpoint: 'https://5be98fe813fcf5f08db3eb1de5c62c51.r2.cloudflarestorage.com',
    credentials: {
        accessKeyId: '3fc75660d71f604a55812f40b0b05540',
        secretAccessKey: '95877ed8694ecd691b02b94d696e474b8a883190f65299c67bb1eab21ece9b11'
    },
    region: 'auto'  // Required for Cloudflare R2
});

//RUN THE COMMAND TO SEE THE CONTENTS OF THE CLOUDFLARE R2 BUCKET:
// npx ts-node Backend/services/cloudflareR2Service.ts

// List all objects in the bucket with pagination
export const listAllObjects = async () => {
    try {
        let allContents: any[] = [];
        let continuationToken: string | undefined = undefined;
        
        do {
            const command = new ListObjectsV2Command({ 
                Bucket: 'ntv-ott',
                MaxKeys: 1000,
                ContinuationToken: continuationToken
            });
            
            const data: ListObjectsV2CommandOutput = await s3Client.send(command);
            if (data.Contents) {
                allContents = [...allContents, ...data.Contents];
            }
            
            continuationToken = data.NextContinuationToken;
        } while (continuationToken);
        
        // Format and display the contents in a more readable way
        console.log('\n=== Bucket Contents ===');
        if (allContents.length > 0) {
            // Group files by folder
            const folderStructure: { [key: string]: any[] } = {};
            
            allContents.forEach((item) => {
                const pathParts = item.Key!.split('/');
                const folder = pathParts.slice(0, -1).join('/');
                if (!folderStructure[folder]) {
                    folderStructure[folder] = [];
                }
                folderStructure[folder].push(item);
            });

            // Display organized structure
            console.log('📁 ROOT FOLDERS:');
            const rootFolders = Object.keys(folderStructure)
                .filter(key => key.indexOf('/') === -1 && key !== '')
                .sort();
            
            rootFolders.forEach(folder => {
                console.log(`   📁 ${folder}`);
            });

            // Removing the empty playlists section
            // Find video folders and files
            console.log('\n🎬 VIDEOS:');
            // Look for folders that potentially contain videos
            const videoFolders = Object.keys(folderStructure)
                .filter(key => !key.includes('segment') && key !== '')
                .filter(key => {
                    // Check if folder contains .m3u8 or other video manifest files
                    return folderStructure[key].some(file => 
                        file.Key!.endsWith('.m3u8') || 
                        file.Key!.endsWith('.mp4') ||
                        file.Key!.endsWith('.ts') ||
                        file.Key!.endsWith('.json')
                    );
                })
                .sort();
                
            if (videoFolders.length > 0) {
                videoFolders.forEach(folder => {
                    console.log(`   📁 ${folder}`);
                    // List important files in video folder (manifest and metadata)
                    const importantFiles = folderStructure[folder].filter(file => {
                        const fileName = file.Key!.split('/').pop();
                        return !fileName?.startsWith('segment_') && 
                               (fileName?.endsWith('.m3u8') || 
                                fileName?.endsWith('.mp4') || 
                                fileName?.endsWith('.json'));
                    });
                    
                    importantFiles.forEach(file => {
                        const fileName = file.Key!.split('/').pop();
                        console.log(`      📄 ${fileName}`);
                    });
                });
            } else {
                console.log('   No video folders found');
            }

            // Show summary
            console.log('\n=== Summary ===');
            console.log(`Total Files: ${allContents.length}`);
            console.log(`Total Folders: ${Object.keys(folderStructure).length}`);
            
            // List all video folders in summary
            console.log(`\nThe bucket contains ${rootFolders.length} video folders:`);
            rootFolders.forEach(folder => {
                console.log(folder);
            });
            
        } else {
            console.log('Bucket is empty');
        }
        
        return { Contents: allContents };
    } catch (error) {
        console.error('Error listing objects:', error);
        throw error;
    }
};

// Get content of a playlist JSON file
export const getPlaylistContent = async (key: string) => {
    try {
        const command = new GetObjectCommand({
            Bucket: 'ntv-ott',
            Key: key
        });
        const response = await s3Client.send(command);
        
        // Convert the response stream to text
        const streamToString = (stream: any): Promise<string> =>
            new Promise((resolve, reject) => {
                const chunks: any[] = [];
                stream.on('data', (chunk: any) => chunks.push(chunk));
                stream.on('error', reject);
                stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
            });
            
        if (response.Body) {
            const bodyContents = await streamToString(response.Body);
            try {
                const jsonContent = JSON.parse(bodyContents);
                console.log(`      Content: ${JSON.stringify(jsonContent, null, 2)}`);
                return jsonContent;
            } catch (e) {
                console.log(`      Content: (Not valid JSON)`);
                return bodyContents;
            }
        }
    } catch (error) {
        console.error(`Error getting playlist content for ${key}:`, error);
        return null;
    }
};

// Get object content
export const getObjectContent = async (key: string) => {
    try {
        const command = new GetObjectCommand({
            Bucket: 'ntv-ott',
            Key: key
        });
        const data = await s3Client.send(command);
        console.log('Object content type:', data.ContentType);
        console.log('Object size:', data.ContentLength);
        return data;
    } catch (error) {
        console.error('Error getting object content:', error);
        throw error;
    }
};

// List all folders (common prefixes)
export const listFolders = async () => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: 'ntv-ott',
            Delimiter: '/'
        });
        const data = await s3Client.send(command);
        console.log('Folders in bucket:', JSON.stringify(data.CommonPrefixes, null, 2));
        return data.CommonPrefixes;
    } catch (error) {
        console.error('Error listing folders:', error);
        throw error;
    }
};

// Execute all exploration functions
export const exploreStorage = async () => {
    console.log('=== Starting R2 Storage Exploration ===');
    await listAllObjects();
    console.log('\n=== Exploration Complete ===');
};

// Execute exploration immediately
exploreStorage().catch(console.error);