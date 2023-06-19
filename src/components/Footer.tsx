import { styled } from 'styled-components';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Wrapper = styled.footer`
  max-width: 920px;
  width: 100%;
  margin: 100px auto 20px;

  .footer_social {
    display: flex;
    font-size: 1.5rem;
    gap: 20px;
  }

  .footer_links {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    font-size: 13px;
    color: #949494;
    li {
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .footer_info {
    margin-top: 40px;
    font-size: 12px;
    color: #949494;
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <ul className='footer_social'>
        <li>
          <a
            href='https://www.facebook.com/NetflixKR'
            target='_blank'
            aria-label='facebook'
          >
            <FaFacebookF />
          </a>
        </li>
        <li>
          <a
            href='https://www.instagram.com/netflixkr/'
            target='_blank'
            aria-label='instagram'
          >
            <FaInstagram />
          </a>
        </li>
        <li>
          <a
            href='https://twitter.com/netflixkr'
            target='_blank'
            aria-label='twitter'
          >
            <FaTwitter />
          </a>
        </li>
        <li>
          <a
            href='https://www.youtube.com/channel/UCiEEF51uRAeZeCo8CJFhGWw/featured'
            target='_blank'
            aria-label='youtube'
          >
            <FaYoutube />
          </a>
        </li>
      </ul>
      <ul className='footer_links'>
        <li>화면해설</li>
        <li>고객센터</li>
        <li>기프트카드</li>
        <li>미디어센터</li>
        <li>투자 정보(IR)</li>
        <li>입사정보</li>
        <li>이용 약관</li>
        <li>개인정보</li>
        <li>법적고지</li>
        <li>쿠키 설정</li>
        <li>회사 정보</li>
        <li>문의하기</li>
      </ul>
      <div className='footer_info'>
        <p>
          넷플릭스서비시스코리아 유한회사 통신판매업신고번호:
          제2018-서울종로-0426호 전화번호: 080-001-9587
        </p>
        <p>대표: 레지널드 숀 톰프슨</p>
        <p>이메일 주소: korea@netflix.com</p>
        <p>
          주소: 대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동 20층
          우편번호 03161
        </p>
        <p>사업자등록번호: 165-87-00119</p>
        <p>클라우드 호스팅: Amazon Web Services Inc.</p>
      </div>
    </Wrapper>
  );
}
