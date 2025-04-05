const About = () => {
    return (
      <div className="bg-transparent text-white flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-extrabold text-4xl md:text-5xl text-white tracking-widest mb-6 text-center">
          ABOUT RESO 2025
        </h1>
  
        <p className="max-w-3xl text-lg text-gray-300 leading-relaxed text-justify">
          <span className="text-red-400 font-bold">RESO 2025</span> is the
          flagship tech fest of{" "}
          <span className="text-red-400 font-bold">
            Manipur Institute of Technology (MIT)
          </span>
          , bringing together students, industry leaders, developers, and
          innovators to shape the future of technology. Our mission is to inspire
          creativity, share knowledge, and create networking opportunities for
          tech enthusiasts through workshops, competitions, and keynote sessions.
          <span className="text-red-400 font-bold"> RESO 2025 </span>includes a
          variety of exciting events such as{" "}
          <span className="text-red-400 font-bold">
            gaming, code debugging, dancing competition, singing competition, quiz
            , and more!
          </span>
        </p>
  
        <div className="mt-10 grid gap-6 md:grid-cols-3 text-center">
          <div className="p-6 bg-gray-800 rounded-3xl shadow-lg border border-gray-600">
            <h2 className="text-xl font-bold text-red-300">🌟 Keynotes</h2>
            <p className="text-gray-400">
              Hear from top industry leaders and visionaries.
            </p>
          </div>
  
          <div className="p-6 bg-gray-800 rounded-3xl shadow-lg border border-gray-600">
            <h2 className="text-xl font-bold text-red-300">🛠️ Workshops</h2>
            <p className="text-gray-400">
              Hands-on sessions with industry experts.
            </p>
          </div>
  
          <div className="p-6 bg-gray-800 rounded-3xl shadow-lg border border-gray-600">
            <h2 className="text-xl font-bold text-red-300">🏆 Competitions</h2>
            <p className="text-gray-400">
              Engage in coding battles and tech challenges.
            </p>
          </div>
        </div>
      </div>
    );
  };
  export default About;