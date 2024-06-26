'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Input, Button } from 'antd';
import { todoChanged, todoAdded, todoRemoved } from './features/todos/todosSlice'
import { useSelector, useDispatch } from 'react-redux'
import { CloseOutlined } from '@ant-design/icons';
const { Search } = Input;
export default function Home() {
  const [editTodoId, setEditTodoId] = useState(null);
  const count = useSelector(state => state.counter.value)
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()
  const inputRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      console.log(event.target)
      console.log(inputRef.current)
      if(inputRef.current && inputRef.current.input !== event.target ){
        setEditTodoId(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function onAdd(e) {
    console.log(e)
    if (e.trim() !== '') {
      // 执行添加逻辑
      console.log('Adding:', e);
      dispatch(todoAdded({ text: e }))
    } else {
      // 搜索框为空时的处理逻辑
      console.log('Search text is empty');
    }
  }
  const todosList = todos.map((todo, index) => {
    function onChange(e, id) {
      dispatch(todoChanged({ id, text: e.target.value }))
    }
    function handleDelete(id) {
      console.log(id)
      dispatch(todoRemoved(id))
    }
    function setCurrent(id) {
      console.log(id)
      setEditTodoId(id)
    }
    return (
      <div key={todo.id} style={{ display: 'flex', alignItems: 'center', marginTop: "20px" }}>
        {editTodoId === todo.id ? (
          <Input defaultValue={todo.text} style={{
            width: 200,
          }}
            ref={inputRef}
            onChange={(e) => onChange(e, todo.id)}
          />
        ) : (
          <div style={{
            width: 200,
          }} onClick={() => setCurrent(todo.id)}>{todo.text}</div>
        )
        }
        < CloseOutlined onClick={() => handleDelete(todo.id)}
          style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} />
      </div>
    )
  }
  )
  return (
    <main>
      <Search
        placeholder="input task"
        allowClear
        enterButton="Add"
        size="large"
        onSearch={onAdd}
        style={{
          width: 350,
        }}
      />
      <div>
        {todosList}
        {/* <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button> */}
      </div>
    </main>

  );
}
