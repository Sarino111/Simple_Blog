import axios from 'axios';

export async function getBlogData(page: number) {
    try {
        const resp = await axios({
            method: 'get',
            url: `https://jsonfakery.com/blogs/simple-paginate?page=${page}`,
            responseType: 'json',
        });
        return resp.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Chyba při načítání dat z blogu: ' + error.message);
        }
    }
}

export async function getBlogDataAll() {
    try {
        const resp = await axios({
            method: 'get',
            url: `https://jsonfakery.com/blogs`,
            responseType: 'json',
        });
        return resp.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Chyba při načítání dat z blogu: ' + error.message);
        }
    }
}
