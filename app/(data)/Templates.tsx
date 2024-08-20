export default [
    {
        name: 'Blog Title',
        desc: 'An AI tool that generates blog titles based on your blog information',
        category: 'Blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/2799/2799954.png',
        aiPrompt: 'Give me 5 blog topic ideas in bullet points only, based on the given niche and outline, and provide the result in Rich Text Editor format',
        slug: 'generate-blog-title',
        form: [
            {
                label: 'Enter your blog niche',
                field: 'input',
                name: 'niche',
                required: true,
            },
            {
                label: 'Enter blog outline',
                field: 'textarea',
                name: 'outline',
                required: true,
            },
        ],
    },
    {
        name: 'Blog Content',
        desc: 'An AI tool that generates blog content based on your blog information',
        category: 'Blog',
        icon: 'https://cdn-icons-png.flaticon.com/128/2593/2593510.png',
        aiPrompt: 'Generate a complete blog content based on the provided topic and outline',
        slug: 'generate-blog-content',
        form: [
            {
                label: 'Enter your blog topic',
                field: 'input',
                name: 'topic',
                required: true,
            },
            {
                label: 'Enter blog outline',
                field: 'textarea',
                name: 'outline',
                required: true,
            },
        ],
    },
    {
        name: 'Blog Topic Ideas',
        desc: 'An AI tool that generates blog topic ideas based on your blog information',
        category: 'Blog',
        icon: 'https://t4.ftcdn.net/jpg/00/78/52/25/240_F_78522501_H98sKqX3zmrJ9UZo3nGyjT3cA25DIgXP.jpg',
        aiPrompt: 'Give me 5 blog topic ideas in bullet points only, based on the given niche and outline, and provide the result in Rich Text Editor format',
        slug: 'generate-blog-topic-ideas',
        form: [
            {
                label: 'Enter your blog niche',
                field: 'input',
                name: 'niche',
                required: true,
            },
            {
                label: 'Enter blog outline',
                field: 'textarea',
                name: 'outline',
                required: true,
            },
        ],
    },
    {
        name: 'YouTube SEO Title',
        desc: 'An AI tool that generates SEO-friendly YouTube titles based on your video information',
        category: 'YouTube Tool',
        icon: 'https://image.shutterstock.com/image-vector/social-media-icon-vector-logotype-260nw-2439917495.jpg',
        aiPrompt: 'Generate SEO-optimized YouTube video titles based on the given keywords and outline',
        slug: 'generate-youtube-seo-title',
        form: [
            {
                label: 'Enter your YouTube video keywords',
                field: 'input',
                name: 'keywords',
                required: true,
            },
            {
                label: 'Enter YouTube video description outline',
                field: 'textarea',
                name: 'outline',
            },
        ],
    },
    {
        name: 'YouTube Description',
        desc: 'An AI tool that generates YouTube video descriptions based on your topic and outline',
        category: 'YouTube Tool',
        icon: 'https://cdn-icons-png.flaticon.com/128/324/324114.png',
        aiPrompt: 'Generate a detailed YouTube video description based on the provided topic and outline',
        slug: 'generate-youtube-description',
        form: [
            {
                label: 'Enter your video topic/title',
                field: 'input',
                name: 'topic',
                required: true,
            },
            {
                label: 'Enter YouTube video outline',
                field: 'textarea',
                name: 'outline',
            },
        ],
    },
    {
        name: 'YouTube Tags',
        desc: 'An AI tool that generates relevant YouTube tags based on your video information',
        category: 'YouTube Tool',
        icon: 'https://cdn-icons-png.flaticon.com/128/3997/3997718.png',
        aiPrompt: 'Generate relevant tags for your YouTube video based on the provided title and outline',
        slug: 'generate-youtube-tags',
        form: [
            {
                label: 'Enter your YouTube video title',
                field: 'input',
                name: 'title',
                required: true,
            },
            {
                label: 'Enter YouTube video outline (optional)',
                field: 'textarea',
                name: 'outline',
            },
        ],
    },
    {
        name: 'Add Emojis to Text',
        desc: 'An AI tool that adds emojis to your text based on the content',
        category: 'Blog',
        icon: 'https://image.shutterstock.com/image-vector/family-parents-child-linear-icon-260nw-1887656392.jpg',
        aiPrompt: 'Enhance the provided text by adding relevant emojis',
        slug: 'add-emoji-to-text',
        form: [
            {
                label: 'Enter your text',
                field: 'input',
                name: 'text',
                required: true,
            },
            {
                label: 'Enter the text to enhance with emojis',
                field: 'textarea',
                name: 'enhancedText',
            },
        ],
    },

    {
        "name": "Add Code to Text",
        "desc": "A programming and coding tool",
        "category": "Blog",
        "icon": "https://cdn-icons-png.flaticon.com/128/8055/8055576.png",
        "aiPrompt": "Enhance the provided text by integrating relevant code.",
        "slug": "add-code-to-text",
        "form": [
            {
                "label": "Enter your text",
                "field": "input",
                "name": "text",
                "required": true
            },
            {
                "label": "Enter the code to integrate with your text",
                "field": "textarea",
                "name": "code"
            }
        ]
    }
    
];
