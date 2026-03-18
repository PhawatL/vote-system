
api

POST /topics
{
    name: string;
    description: string;
    options: string[];
}
GET /topics?page=0&size=10


POST /votes
{
    topicId: number;
    optionId: number;
}


