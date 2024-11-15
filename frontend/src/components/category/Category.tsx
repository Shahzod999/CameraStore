import { React } from 'react'
import "./category.scss";

const Category = ({ category, setCategory }) => {
    return (
        <div className='categoryHolder' style={{ pointerEvents: category ? "" : "none" }}>
            <div className={`${category ? "activeCategory" : ""} category`}>
                <div className="category__box">
                    <div className="category__brand-div">
                        <h1 className="category__title">Logitech</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. Logitech C920</a></li>
                            <li className="category__item"><a href="" className="category__link">2. Logitech C922 Pro</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">Razer</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. Razer Kiyo</a></li>
                            <li className="category__item"><a href="" className="category__link">2. Razer Kiyo Pro</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">Microsoft</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. Microsoft LifeCam HD-3000</a></li>
                            <li className="category__item"><a href="" className="category__link">2. Microsoft LifeCam Studio</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">AVerMedia</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. AVerMedia Live Streamer CAM 313</a></li>
                            <li className="category__item"><a href="" className="category__link">2. AVerMedia PW513</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">HP</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. HP HD 4310</a></li>
                            <li className="category__item"><a href="" className="category__link">2. HP Pavilion Webcam</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">Dell</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. Dell UltraSharp Webcam</a></li>
                            <li className="category__item"><a href="" className="category__link">2. Dell P2419H Webcam</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">Ausdom</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. Ausdom AF640</a></li>
                            <li className="category__item"><a href="" className="category__link">2. Ausdom AW615</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">Creative</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. Creative Live! Cam Chat HD</a></li>
                            <li className="category__item"><a href="" className="category__link">2. Creative Live! Cam Sync 1080p</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">Wyze</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. Wyze Cam v3</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">NexiGo</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. NexiGo N60</a></li>
                            <li className="category__item"><a href="" className="category__link">2. NexiGo N940E</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">Cisco</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. Cisco Webex Room Kit</a></li>
                            <li className="category__item"><a href="" className="category__link">2. Cisco PrecisionHD</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">INSMY</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. INSMY HD Webcam</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">AOC</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. AOC I1659FWUX</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">Amcrest</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. Amcrest 1080P Webcam</a></li>
                            <li className="category__item"><a href="" className="category__link">2. Amcrest AWC1921080</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">Sony</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. Sony PlayStation Camera</a></li>
                            <li className="category__item"><a href="" className="category__link">2. Sony DSC-QX10 (smartphone lens)</a></li>
                        </ul>
                    </div>
                    <div className="category__brand-div">
                        <h1 className="category__title">Lenovo</h1>
                        <ul className="category__list">
                            <li className="category__item"><a href="" className="category__link">1. Lenovo 300 FHD Webcam</a></li>
                            <li className="category__item"><a href="" className="category__link">2. Lenovo ThinkPad Ultra Dock Webcam</a></li>
                        </ul>
                    </div>
                </div>


            </div>

            <div className={`${category ? "nonActiveCategoryFalse" : ""} nonActiveCategory`} onClick={() => setCategory(false)}>
            </div>
        </div >
    )
}

export default Category