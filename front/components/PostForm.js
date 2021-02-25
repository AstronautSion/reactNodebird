import React, { useCallback, useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST } from '../reducers/post';


const PostForm = () =>{
    const dispatch = useDispatch();
    const [content, setContent] = useState(''); 
    const { imagePaths, isAddingPost ,postAdded } = useSelector(state => state.post);

    useEffect(()=>{
        setContent('');
    },[postAdded === true])

    const onChangeContent = useCallback((e)=>{
        setContent(e.target.value);
    }, []);
    const onSubmitFrom = useCallback((e) =>{
        e.preventDefault();
        if(!content || !content.trim()){
            return alert('게시글을 작성하세요.');
        }
        dispatch({
            type: ADD_POST_REQUEST,
            data: {
                content : content.trim(),
            }
        });
    }, [content]);

    

    return(
        <>
            <Form style={{marginBottom : '20px'}} encType="multipart/form-data" onSubmit={onSubmitFrom}>
                <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" value={content} onChange={onChangeContent} />   
                <div>
                    <Button>이미지 업로드</Button>
                    <Button type="primary" style={{float:'right'}} htmlType="submit" loading={isAddingPost}>짹짹</Button>
                </div>
                <div>
                    {imagePaths.map((v) =>(
                        <div key={v} styly={{ display: 'inline-block' }}>
                            <img src={`http://localhost:3000/${v}`} style={{ width: '200px' }} alt={v} />
                            <div>
                                <Button>제거</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Form>
        </>
    );
}

export default PostForm;