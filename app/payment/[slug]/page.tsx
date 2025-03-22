
import PaymentVerify from "@/components/payments/PaymentVerify";
import PaymentSuccess from "@/components/payments/PaymentSuccess";
import PaymentCancel from "@/components/payments/PaymentCancel";

export default function Page({ params }: { params: { slug: string } }) {
    if(params.slug == "verify"){
        return <PaymentVerify/>
    }
    else if(params.slug == "success"){
        return <PaymentSuccess/>
    }
    else if(params.slug == "failed"){
        return <PaymentCancel/>
    }
  }