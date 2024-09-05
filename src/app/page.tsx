import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main className="main-06">
        <div className="header header-06">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4">
                <a href="#" className="logo">
                  <img src="assets/img/logo.png" alt="" />
                </a>
              </div>
              <div className="col-md-8">
                <div className="header-right text-right">
                  <a href="#">Say hello! info@yourwebsite.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-wrapper demo-06">
          <div className="hero-area">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="heading">
                    <h1
                      className="text-white wow fadeInUp"
                      data-wow-delay=".2s"
                    >
                      We Are <br />
                      Coming Soon
                    </h1>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7">
                  <div
                    className="wow fadeInRight"
                    data-wow-delay=".4s"
                    data-countdown="2021/10/01"
                  ></div>
                </div>
                <div className="col-xl-5 col-lg-5">
                  <p className="wow fadeInLeft" data-wow-delay=".4s">
                    We're strong believers that the best solutions come from
                    gathering new insights and pushing conventional boundaries.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="team-area">
            <div className="container">
              <div className="row">
                <div className="col-xl-9">
                  <div className="section-title">
                    <h1 className="wow fadeInUp" data-wow-delay=".2s">
                      Our Real Hero
                    </h1>
                    <h2 className="wow fadeInUp" data-wow-delay=".4s">
                      Every month, amounts of Projects
                      <br className="d-none d-lg-block" />
                      handover by this genius team.
                    </h2>
                  </div>
                </div>
              </div>
              <div className="team-wrapper">
                <div className="team-item wow fadeInUp" data-wow-delay=".2s">
                  <div className="team-img">
                    <img src="assets/img/img-1.jpg" alt="" />
                    <ul className="social-links">
                      <li>
                        <a href="#">
                          <i className="lni lni-facebook-filled"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="lni lni-twitter-filled"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="lni lni-instagram-original"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="lni lni-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="team-info">
                    <h4>John Doe</h4>
                    <p>Sr. Software Engineer</p>
                  </div>
                </div>
                <div className="team-item wow fadeInUp" data-wow-delay=".4s">
                  <div className="team-img">
                    <img src="assets/img/img-2.jpg" alt="" />
                    <ul className="social-links">
                      <li>
                        <a href="#">
                          <i className="lni lni-facebook-filled"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="lni lni-twitter-filled"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="lni lni-instagram-original"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="lni lni-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="team-info">
                    <h4>Sarah Junyna</h4>
                    <p>Business Manager</p>
                  </div>
                </div>
                <div className="team-item wow fadeInUp" data-wow-delay=".6s">
                  <div className="team-img">
                    <img src="assets/img/img-3.jpg" alt="" />
                    <ul className="social-links">
                      <li>
                        <a href="#">
                          <i className="lni lni-facebook-filled"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="lni lni-twitter-filled"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="lni lni-instagram-original"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="lni lni-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="team-info">
                    <h4>Rob Hope</h4>
                    <p>UX/UI Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <div className="copyright wow fadeInLeft" data-wow-delay=".2s">
                  <p>
                    Part of{" "}
                    <a href="htts://uideck.com" rel="nofollow">
                      UIdeck
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-md-5">
                <div className="credit wow fadeInRight" data-wow-delay=".4s">
                  <p>
                    Designed and Developed by
                    <a rel="nofollow" href="https://soonlaunch.com">
                      SoonLaunch
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <script src="assets/js/vendor/modernizr-3.5.0.min.js"></script>
      <script src="assets/js/vendor/jquery-3.5.1.min.js"></script>
      <script src="assets/js/popper.min.js"></script>
      <script src="assets/js/bootstrap-4.5.0.min.js"></script>
      <script src="assets/js/countdown.js"></script>
      <script src="assets/js/wow.min.js"></script>
      <script src="assets/js/main.js"></script>
    </div>
  );
}
