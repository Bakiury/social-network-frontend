import cloudinaryApi from '@/api/cloudinaryApi';

const uploadImage = async (file: any) => {
    if (!file) return;
    try {
        const formData = new FormData();
        formData.append('upload_preset', 'bakiury-preset');
        formData.append('file', file);
        const { data } = await cloudinaryApi.post('', formData);
        // console.log(data);
        return data.secure_url;
    } catch (error) {
        console.error('Error loading the image, check logs');
        console.log(error);
        return null;
    }
};

export default uploadImage;