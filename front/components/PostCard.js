import React, { useCallback, useState } from 'react';
import {Card, Icon, Button, Avatar, List, Comment} from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import PostCardForm from '../components/PostCardForm';

const PostCard = ({ post }) =>{
    const [ commentFormOpend, setCommentFormOpend] = useState(false);
    const { me } = useSelector(state => state.user);
    
    const onToggleComment = useCallback(() =>{
        if(!me){
            return alert('로그인이 필요합니다.');
        }
        setCommentFormOpend(prev => !prev);
    },[me && me.id])
    
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
                        avatar={<Link href={{ pathname: '/user', query: {id: post.User.id}}} as={`/user/${post.User.id}`} ><a><Avatar>{post.User.nickname}</Avatar></a></Link>}
                        title={post.User.nickname}
                        description={<div>{post.content.split(/(#[^\s]+)/g).map((v) => {
                            if (v.match(/#[^\s]+/)){
                                return (
                                    <Link key={v} href={ { pathname: '/hashtag', query: { tag: v.slice(1) }}} as={ `/hashtag/${v.slice(1)}`}  ><a>{v}</a></Link>
                                );
                            }
                            return v;
                        })}</div>}
                    />
                </Card> 
            }
                {commentFormOpend && (
                    <>
                        <PostCardForm post={post} />
                        <List 
                            header={`${post.Comments ? post.Comments.length : 0} 댓글`}
                            itemLayout="horizontal"
                            dataSource={post.Comments || []}
                            renderItem={item =>(
                                <li>
                                    <Comment 
                                        author={item.User.nickname}
                                        avatar={<Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${ item.User.id }`} >
                                            <a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
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