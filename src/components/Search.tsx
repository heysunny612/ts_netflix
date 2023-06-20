import { BsSearch } from 'react-icons/bs';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = styled.form`
  overflow: hidden;
  display: flex;
  align-items: center;

  @media (max-width: 968px) {
    position: absolute;
    right: 10px;
  }

  div {
    display: flex;
    justify-content: space-between;
    width: 250px;
    border: 1px solid transparent;
    padding: 5px 3px;
    border-radius: 5px;
  }

  input[type='text'] {
    width: 200px;
    padding: 5px;
    z-index: 99;
    background-color: transparent;
    border: 0 none;
    color: #fff;
    outline: none;
  }
  button {
    color: #fff;
    font-size: 22px;
  }
`;

export default function Search() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (keyword.trim().length === 0) return;
    const searchUrl = `/search?keyword=${keyword || ''}`;
    navigate(searchUrl, { state: { keyword } });
    setKeyword('');
  };
  const handleToggle = () => {
    if (!searchOpen) {
      setTimeout(() => {
        inputRef.current && inputRef.current.focus();
      }, 600);
    }
    setSearchOpen((open) => !open);
  };

  return (
    <SearchForm onSubmit={handleSumbit}>
      <motion.div
        initial={{ x: 200 }}
        animate={{
          x: searchOpen ? 0 : 200,
          borderColor: `rgba(255,255,255,${searchOpen ? '0.5' : '0'})`,
          backgroundColor: `rgba(0,0,0,${searchOpen ? '0.5' : '0'})`,
          transition: { duration: 0.5 },
        }}
      >
        <button type='button' onClick={handleToggle}>
          <BsSearch />
        </button>
        <input
          type='text'
          placeholder='Search for...'
          ref={inputRef}
          value={keyword}
          onChange={(e) => setKeyword(e.currentTarget.value)}
        />
      </motion.div>
    </SearchForm>
  );
}
