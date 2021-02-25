import React, { useCallback, useEffect, useState } from 'react';
import {Card, Icon, Button, Avatar, List, Form, Input, Comment} from 'antd';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const PostCard = ({ post }) =>{
    const [ commentFormOpend, setCommentFormOpend] = useState(false);
    const [ commentText, setCommentText] = useState('');
    const { me } = useSelector(state => state.user);
    const { commentAdded, isAddingComment } = useSelector(state => state.post);
    const dispatch = useDispatch();
    

    const onToggleComment = useCallback(() =>{
        if(!me){
            return alert('로그인이 필요합니다.');
        }
        setCommentFormOpend(prev => !prev);
    },[me && me.id])
    const onSubmitComment = useCallback((e)=>{
        e.preventDefault();
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: me.id },
          });
    },[commentText]);
    const onChangeCommentText = useCallback((e)=>{
        setCommentText(e.target.value);
    },[]);
    
    useEffect(()=>{
        setCommentText('');
    },[commentAdded === true])
    
    return(
        <>  
            {post.User && 
                <Card
                    key={post.createdAt}
                    cover={post.img && <img alt="example" src={post.img} />}
                    actions={[
                        <Icon type="retweet" key="retweet" />,
                        <Icon type="heart" key="heart" />,
                        <Icon type="message" key="message" onClick={onToggleComment} />,
                        <Icon type="ellipsis" key="ellipsis" />
                    ]}
                    extra={<Button>팔로우</Button>}
                >
                    <Card.Meta
                        avatar={<Avatar>{post.User.nickname}</Avatar>}
                        title={post.User.nickname}
                        description={post.content}
                    />
                </Card> 
            }
                {commentFormOpend && (
                    <>
                        <Form onSubmit={onSubmitComment}>
                            <Form.Item>
                                <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                            </Form.Item>
                            <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                        </Form>
                        <List 
                            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
                            itemLayout="horizontal"
                            dataSource={post.Comments || []}
                            renderItem={item =>(
                                <li>
                                    <Comment 
                                        author={item.user.nickname}
                                        avatar={<Avatar>{item.user.nickname[0]}</Avatar>}
                                        content={item.content}
                                        datetime={item.createdAt}
                                    />
                                </li>
                            )}
                        />
                    </>
                )}
            
        </>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        user: PropTypes.object,
        createdAt: PropTypes.string,
        content: PropTypes.string,
        img: PropTypes.string,
    })
};

export default PostCard;