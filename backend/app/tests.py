from datetime import datetime, timedelta
import unittest
from app import app, db
from app.models import Post


class PostModelCases(unittest.TestCase):

    def setUp(self):
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://'
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    # Test One Posts
    def test_add_data_in_database(self):
        db.session.remove()
        p1 = Post(postBody="Welcome In The Ali Project", authorName="Ali", imageField="Empty")
        db.session.add(p1)
        db.session.commit()
        p1 = Post.query.first()
        self.assertEqual(p1.authorName, 'Ali')
        self.assertEqual(p1.postBody, 'Welcome In The Ali Project')
        self.assertEqual(p1.imageField, 'Empty')
        client = app.test_client()
        res = client.get('http://localhost:5000/posts')
        data = res.get_json()
        assert data["posts"][0]["authorName"] == 'Ali'

    # Test Ordered of Tow Posts and values for it.
    def test_add_tow_post_in_database_and_compared(self):
        p1 = Post(postBody="Welcome In The Ali1 Project", authorName="Ali1", imageField="Empty")
        p2 = Post(postBody="Welcome In The Ali2 Project", authorName="Ali2", imageField="Link")
        db.session.add(p1)
        db.session.add(p2)
        db.session.commit()
        self.assertEqual(p1.authorName, 'Ali1')
        self.assertEqual(p2.authorName, 'Ali2')
        self.assertEqual(p1.postBody, 'Welcome In The Ali1 Project')
        self.assertNotEqual(p2.imageField, 'Empty')
        client = app.test_client()
        res = client.get('http://localhost:5000/posts')
        data = res.get_json()
        assert data["posts"][0]["authorName"] == "Ali2"
        assert data["posts"][1]["authorName"] == "Ali1"

    # Tested deleted the posts "Wrong way"FGKSHFKUSZ
    def test_delete_from_database(self):
        p1 = Post(postBody="Welcome In The Abdullah Project", authorName="Abdullah",
                  imageField="Abdullah Profile Image")
        p2 = Post(postBody="Welcome In The Ayham Project", authorName="Ayham", imageField="Ayham Profile Image")
        db.session.add(p1)
        db.session.add(p2)
        db.session.commit()
        client = app.test_client()
        res = client.delete('http://localhost:5000/delete_post/1')
        db.session.commit()
        res = client.get('http://localhost:5000/posts')
        data = res.get_json()
        assert data["posts"][0]["authorName"] == "Ayham"
        # when i added now a new post thats will have a zero id and Ayham author have a one because it's ordered
        p4 = Post(postBody="Welcome In The Ali Project", authorName="Ali", imageField="Ali Profile Image")
        db.session.add(p4)
        db.session.commit()
        res = client.get('http://localhost:5000/posts')
        data = res.get_json()
        assert data["posts"][0]["authorName"] == "Ali"
        assert data["posts"][1]["authorName"] == "Ayham"
        allPosts = Post.query.all()
        print(allPosts[-1])

    # tested used delete routes
    def test_delete_depends_on_route(self):
        client = app.test_client()
        p1 = Post(postBody="Welcome In The Ali Project", authorName="Ali", imageField="Ali Profile Image")
        db.session.add(p1)
        db.session.commit()
        res = client.delete(f'http://localhost:5000/delete_post/{p1.id}')
        data = res.get_json()
        assert data["messages"] == "Deleted Successfully"

    # Update on without Routes
    def test_update_value(self):
        p1 = Post(postBody="Welcome In The Abdullah Project", authorName="Abdullah",
                  imageField="Abdullah Profile Image")
        db.session.add(p1)
        db.session.commit()
        self.assertEqual(p1.authorName, 'Abdullah')
        p1.authorName = "Sameh"
        db.session.commit()
        self.assertNotEqual(p1.authorName, 'Abdullah')
        self.assertEqual(p1.authorName, 'Sameh')

    # Update used Route
    def test_update_used_routes(self):
        client = app.test_client()
        p1 = Post(authorName="Abdullah", postBody="Welcome In The Abdullah Project",
                  imageField="Abdullah Profile Image")
        db.session.add(p1)
        db.session.commit()
        res = client.put(f'http://localhost:5000/update_post_author/{p1.id}',
                         data='{"authorName": "Ali","postBody": "Welcome in edit Post","imageField":"Ali Image"}',
                         headers={'Content-Type': 'application/json'})
        data = res.get_json()
        assert data["messages"] == "Updated Successfully"

#     Add Post used Routes
    def test_add_post(self):
        client = app.test_client()
        res = client.post('http://localhost:5000/add-post',
                          data='{"authorName": "Ali","postBody": "Welcome in edit Post","imageField":"Ali Image"}',
                          headers={'Content-Type': 'application/json'})
        data = res.get_json()
        assert data["post"]["authorName"] == "Ali"
        assert data["post"]["postBody"] == "Welcome in edit Post"
        assert data["post"]["imageField"] == "Ali Image"
