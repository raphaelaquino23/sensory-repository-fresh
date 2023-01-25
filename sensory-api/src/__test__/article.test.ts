import app from "../app";
import supertest from "supertest";
import { request } from "express";

describe("/Article", () => {
  describe("given a collection of articles", () => {
    test("should be able to return a single article given its id", async () => {
      await supertest(app).get(`app/Article/0`).expect(200);
    });

    test("should be able to return all articles", async () => {
      await supertest(app).get(`app/Article`).expect(200);
    });

    test("should be able to post an article to /articles", async () => {
      const response = await request(app).post("/Article").send({
        ArticleInformation_Id: 0,
        ArticleStats_Id: 0,
        Article_DateCreated: Date.now,
        Article_DateEdited: Date.now,
        User_Id: 0,
      });
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(response.body.Article_Id).toBeDefined();
    });

    test('should return status code of 400 when passing invalid Article', async () => {
      const bodyData = [
        {ArticleInformation_Id: 0},
        {ArticleStats_Id: 0},
        {Article_DateCreated: Date.now},
        {User_Id: 0},
      ]
      for (const body of bodyData){
        const response = await request(app).post('/Article').send(body)
        expect(response.statusCode).toBe(400)
      }
    })

    test("should return 404 given no articles", async () => {
      await supertest(app).get(`app/Article`).expect(404);
    });
  });
});

describe("/ArticleInformation", () => {
  describe("given a collection of articleinformation", () => {
    test('should be able to post an articleinformation', async () => {
      const response = await request(app).post('/ArticleInformation').send({
        ArticleInformation_Id: 0,
        ArticleInformation_Name: '',
        ArticleTopic_Id: 0,
        ArticleInformation_Description: '',
        ArticleInformation_Url: '',
        ArticleInformation_PublishedBy: '',
        ArticleInformation_Image: '',
      })
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(response.body.Article_Id).toBeDefined();
    })

    test('should return status code of 400 when passing invalid Article', async () => {
      const bodyData = [
        {ArticleInformation_Id: 0},
        {ArticleInformation_Name: '',},
        {ArticleTopic_Id: 0},
        {ArticleInformation_Description: ''},
        {ArticleInformation_Url: ''},
        {ArticleInformation_PublishedBy: ''},
        {ArticleInformation_Image: ''},
      ]
      for (const body of bodyData){
        const response = await request(app).post('/ArticleInformation').send(body)
        expect(response.statusCode).toBe(400)
      }
    })

    test("should be able to return all articles information", async () => {
      await supertest(app).get(`app/ArticleInformation`).expect(200);
    });

    test("should be able to return a single article information given its id", async () => {
      await supertest(app)
        .get(`app/ArticleInformation/:ArticleInformation_Id`)
        .expect(200);
    });
  })
});

describe("/ArticleStats", () => {
  describe('given a collection of articlestats', () => {

    test('should be able to post an Article Stat', async () => {
      const response = await request(app).post('/ArticleStats').send({
        ArticleStats_Id: 0,
        ArticleStats_Upvotes: 0,
        ArticleStats_Clicks: 0,
        ArticleStats_Downloads: 0,
      })
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(response.body.Article_Id).toBeDefined();
    })

    test('should return status code of 400 when passing invalid Article Stat', async () => {
      const bodyData = [
        {ArticleStats_Id: 0},
        {ArticleStats_Upvotes: 0},
        {ArticleStats_Clicks: 0},
        {ArticleStats_Downloads: 0},
      ]
      for (const body of bodyData){
        const response = await request(app).post('/ArticleStats').send(body)
        expect(response.statusCode).toBe(400)
      }
    })

    test("should be able to return all articles stats", async () => {
      await supertest(app).get(`app/ArticleStats`).expect(200);
    });
    test("should be able to return a single article stats given its id", async () => {
      await supertest(app).get(`app/ArticleStats/:ArticleStats_Id`).expect(200);
    });
  })
});

interface ArticleTopic {
	ArticleTopic_Id: Number;
	ArticleTopic_Name: String;
	ArticleTopic_Description: String;
}

describe("/ArticleTopic", () => {
  describe('given a collection of articletopics', () => {
    
    test('should be able to post an Article Topic', async () => {
      const response = await request(app).post('/ArticleTopic').send({
        ArticleTopic_Id: 0,
        ArticleTopic_Name: '',
        ArticleTopic_Description: '',
      })
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      expect(response.body.Article_Id).toBeDefined();
    })

    test('should return status code of 400 when passing invalid Article Topic', async () => {
      const bodyData = [
        {ArticleTopic_Id: 0},
        {ArticleTopic_Name: ''},
        {ArticleTopic_Description: ''},
      ]
      for (const body of bodyData){
        const response = await request(app).post('/ArticleTopic').send(body)
        expect(response.statusCode).toBe(400)
      }
    })

    test("should be able to return all articles topics", async () => {
      await supertest(app).get(`app/ArticleTopic`).expect(200);
    });
    test("should be able to return a single article topic given its id", async () => {
      await supertest(app).get(`app/ArticleTopic/:ArticleTopic_Id`).expect(200);
    });
  })
});
