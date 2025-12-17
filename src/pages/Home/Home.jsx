
import Banner from '../../components/Banner/Banner';
import PopularContests from './PopularContests/PopularContests';
import FAQ from './FAQ/FAQ';
import JoinContestHub from './WhyJoinContestHub/JoinContestHub';
import HowItWorks from './HowItsWorks/HowItWorks';
import Reviews from './Reviews/Reviews';
import Winners from './Recent Winners/Winners';


const Home = () => {
    return (
      <div>
        <title>ContestHub - Home</title>
        <div className="mt-20">
          <Banner />
        </div>
        <PopularContests />
        <Winners />
        <Reviews />
        <HowItWorks />
        <JoinContestHub />
        <FAQ />
      </div>
    );
};

export default Home;