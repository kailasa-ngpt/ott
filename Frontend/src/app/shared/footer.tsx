const Footer: React.FC = () => {
    return (
      <footer className="py-4 bg-white text-center text-gray-600 text-sm w-full border-t">
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