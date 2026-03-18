table topics {
  id int pk
  name text
  description text
  created_at timestampz
}
table options {
  id int pk
  topic_id int
  order int
  name text
  vote int
}

Ref: "topics"."id" < "options"."id"

/vote มี pagination
/vote/create


vote มี topic description และ option[]

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

