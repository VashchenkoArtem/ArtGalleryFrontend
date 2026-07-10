import { GoogleLogin } from "@react-oauth/google";
import { useLoginWithGoogleMutation } from "../../api/auth.api";

export function GoogleLoginButton() {
  const [loginWithGoogle] = useLoginWithGoogleMutation();

  return (
    <GoogleLogin
      onSuccess={(res) => {
        if (res.credential) loginWithGoogle({ idToken: res.credential });
      }}
      onError={() => console.error("Google login failed")}
    />
  );
}