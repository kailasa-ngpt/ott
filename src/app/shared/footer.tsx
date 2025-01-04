const Footer: React.FC = () => {
    return (
      <footer className="py-4 bg-black text-center text-gray-400 text-sm fixed bottom-0 left-0 w-full">
        <p>
          © 2024 Sri Nithyananda Paramashivam. All rights reserved. KAILASA's Nithyananda TV.
        </p>
        <div className="flex justify-center mt-2 space-x-4">
          {['facebook', 'twitter', 'youtube', 'instagram', 'website'].map((platform, index) => (
            <a key={index} href="#" className="hover:underline">
              {platform}
            </a>
          ))}
        </div>
      </footer>
    );
  };
  
  export default Footer;