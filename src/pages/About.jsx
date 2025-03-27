import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            eius distinctio alias aspernatur iste aperiam, ea minima? Veniam
            animi, quidem fugiat quod reprehenderit similique eveniet
            perspiciatis ratione quas ad corrupti?
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit,
            consequuntur necessitatibus iure mollitia, doloribus veniam, quia
            dolor reiciendis obcaecati quidem dolore aperiam earum? Omnis
            exercitationem voluptas nam asperiores, repellendus eius?
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, magni
            iusto nisi dolorum sapiente architecto eius deleniti porro! Nobis,
            cupiditate unde saepe laborum nulla doloremque quae! Quos voluptate
            velit quam?
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
