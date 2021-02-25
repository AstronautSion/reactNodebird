import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";
import PropTypes from 'prop-types';

const PostCardForm  = ({post}) => {

    const [ commentText, setCommentText] = useState('');
    const { me } = useSelector(state => state.user);
    const { commentAdded, isAddingComment } = useSelector(state => state.post);
    const dispatch = useDispatch();

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
    return (
        <>
        <Form onSubmit={onSubmitComment}>
            <Form.Item>
                <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
        </Form>
        </>
    );
}
PostCardForm.propTypes = {
    post: PropTypes.shape({
        user: PropTypes.object,
        createdAt: PropTypes.string,
        content: PropTypes.string,
        img: PropTypes.string,
    })
};

export default PostCardForm;



