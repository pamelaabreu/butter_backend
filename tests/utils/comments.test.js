jest.mock('../../services/comments')
const CommentService = require('../../services/comments');

jest.mock('../../services/notifications')
const NotificationService = require('../../services/notifications');

jest.mock('../../services/posts')
const PostService = require('../../services/posts');

const {createCommentAndNotify, } = require('../../utils/comments');

test('success call', done => {
    PostService.read.mockImplementation(() => Promise.resolve({
        user_posted_id: 0,
    }))
    CommentService.create.mockImplementation(() => Promise.resolve({
        id: 1,
    }))
    CommentService.readAllComments.mockImplementation(() => Promise.resolve())
    NotificationService.create.mockImplementation(() => Promise.resolve())

    createCommentAndNotify(1,2,'hi').then(data => {
        expect(PostService.read.mock.calls[0][0]).toBe(2)
        done()
    })
})