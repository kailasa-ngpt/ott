import { configureCORS } from '../services/cloudflareR2Service';

async function main() {
    try {
        console.log('Configuring CORS for R2 bucket...');
        await configureCORS();
        console.log('CORS configuration completed successfully');
    } catch (error) {
        console.error('Failed to configure CORS:', error);
        process.exit(1);
    }
}

main(); 