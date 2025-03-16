import { handleDate } from '@/utils/functions';

import { BlogData } from '@/utils/types/types';

export const extractDataBlog = ( data: BlogData ) => {
    const { 
        id,
        title,
        category,
        created_at,
        featured_image,
        main_content,
        user,
        subtitle,
    } = data;

    const name = user.first_name + ' ' + user.last_name
    const createdDate = handleDate(created_at)

    return {
        id: id ?? null,
        title,
        category,
        created: createdDate,
        image: featured_image,
        content: main_content,
        userName: name,
        profilePicture: user.profile_pic,
        subtitle,
    };
};