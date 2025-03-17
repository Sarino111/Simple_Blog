
type User = {
    id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    email_verified_at: string | null;
    profile_pic: string;
    role: string;
    username: string;
    address_id: string;
    contact_id: string;
    created_at: string;
    updated_at: string;
}

type Comment = {
    id: string;
    user_id: string;
    blog_post_id: string;
    main_content: string;
    created_at	: string;
    updated_at: string;    
};

export type BlogData = {
    id: string;
    user_id: string;
    title: string;
    subtitle: string;
    summary: string;
    main_content: string;
    category: string;
    featured_image: string;
    tags: string[];
    comments: Comment[];
    created_at: string;
    updated_at: string;
    user: User;
}

export type ExtractDataBlog = {
    id: number,
    title : string,
    subtitle: string;
    category: string,
    created: string,
    createdIso: string,
    image: string,
    content: string,
    userName: string,
    profilePicture: string,
}