import React from 'react';
// import axios from 'axios';

// const NameSection = ({feeds}) => {
//     return (
//         <div className="name_section">
//             <div className="name_image">
//                 <a href="#">
//                 <img src="./img/프로필사진(통일).jpg" alt="프로필" className="profile_photo"/>
//                 </a>
//             </div>
//             <div className="name_text">
//                 <a href="#" className="ppl_id">{feeds[0].name}</a>
//                 <p>{feeds[0].location}</p>
//             </div>
//         </div>
//     )
// }

function FeedPage() {
    // const [ feeds, setFeeds ] = useState([{
    //     name: '',
    //     location: ''
    // }]);
    // useEffect(() => {
    //     axios.get('http://localhost:5000/api/feeds/feed')
    //     .then(response => {
    //         setFeeds(response.data);
    //     });
    // }, [])
    console.log("hi")
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="post_inner">
            <div className="post_container">
                {/* <NameSection feeds={feeds}/> */}
                {/* <!-- 아이디/지역 프로필 --> */}

                <div className="image_section">
                    <img src="./img/게시물내용.JPG" alt="게시물사진" className="image_photo"/>
                </div>
                {/* <!-- 피드 이미지 --> */}

                <div className="icon_section">
                    <button type="button" className="good_btn">
                        <i className="far fa-heart icon_good"></i>
                    </button>
                    <button type="button" className="comment_btn">
                        <i className="far fa-comment icon_comment"></i>
                    </button>
                    <button type="button" className="bookmark_btn">
                        <i className="far fa-bookmark icon_bookmark"></i>
                    </button>
                </div>
                {/* <!-- 하트/댓글/북마크 --> */}

                <div className="good_section">
                    <div>좋아요 10명</div>
                </div>
                {/* <!-- 좋아요 갯수 --> */}

                <div className="insta_post_section">
                    <div className="post_section">
                            <div className="diary_post_section diray_post_default">
                                <span className="ppl_id">feeds[0].name</span>
                                feeds[0].content
                           </div>
                           <span className="post_more">더보기</span>
                     </div>
                     <span className="comment_more">댓글 더보기</span>
                    <div className="comment">
                        <ul className="comment_list">
                            <li>
                                <span className="ppl_id">jun_snake</span>
                                <span className="ppl_comment">산책하기 좋은 곳이네요...</span> 
                            </li>
                            <li> <span className="ppl_id">머리볶은사자</span>
                                <span className="ppl_comment">멋진 사진이네요^^~</span>
                            </li>
                            <li>
                                <span className="ppl_id">뚜비</span>
                                <span className="ppl_comment">야경이 너무 예뻐요!</span>
                            </li>
                            <li>
                                <span className="ppl_id">까망</span>
                                <span className="ppl_comment">서울에 이런 곳이 있었군요!ㅎㅎ</span> 
                            </li>
                        </ul>
                    </div>    
                 </div>
                    <div className="time_section">
                        <time>2시간전</time>
                    </div>
                    {/* <!-- 피드 게시 시간 --> */}
    
                    <div className="comment_section">
                        <div className="comment_box">
                            <textarea className="comment_textarea" cols="55" rows="2" placeholder="댓글 달기"></textarea>
                        </div>
                        <button className="comment_button">게시</button>
                    </div>
                </div>
                </div>
        <footer id="footer">
            <div className="footer_wrap"></div>
        </footer>
           
    
        </div>
    )
}

export default FeedPage;
