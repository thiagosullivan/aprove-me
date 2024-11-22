import Image from "next/image";
import LoginForm from "../_components/LoginForm";

const LoginPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="flex h-full items-center justify-center">
        <LoginForm />
      </div>
      <div className="bg-bankmeBlue px-10">
        <div className="relative h-full w-full">
          <Image
            src="/assets/bankme-banner.png"
            alt="Bankme"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
