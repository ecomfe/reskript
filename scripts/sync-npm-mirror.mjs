import fs from 'node:fs';
import {fetch} from 'undici';

(async () => {
    const packages = fs.readdirSync('packages');
    for (const packageName of packages) {
        const response = await fetch(
            `https://registry-direct.npmmirror.com/@reskript/${packageName}/sync?sync_upstream=true`,
            {
                method: 'PUT',
                headers: {
                    'accept': 'application/json',
                }
            }
        );
        const {ok, error, logId} = await response.json();
        if (ok) {
            console.log(`https://registry.npmmirror.com/sync/@reskript/${packageName}#logid=${logId}`);
        }
        else {
            console.error(`${packageName} sync failed: error`);
        }
    }
})();
