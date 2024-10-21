import { flavors, flavorEntries, version } from "@catppuccin/palette";
import Image from "next/image";
import Link from "next/link";


export const PersonalInfo = () => {
  const styleInfoText = {width:60,display:"inline-block",textAlign:"center"};

  return (

    <div style={{fontSize:20,position:"absolute",top:'50%',transform:'translateY(-50%)'}}>

      <Image src="/profile.jpg" width={200} height={200} style={{maxWidth:200,borderRadius:"50%",margin:"auto",overflow:"hidden",borderWidth:5,borderColor: "#303347"}} alt="Profile photo"/>


      <div style={{paddingTop: 50}}>
        <div style={styleInfoText}>
          <span className={`nf-oct-person_fill`}
          style={{color: flavors.macchiato.colors.sky.hex,textAlign:"right"}}>
          </span>
        </div> 
         Harold Manzano
      </div>
      <div>
        <div style={styleInfoText}>
          <span className={`nf-fa-graduation_cap`}
          style={{color: flavors.macchiato.colors.green.hex}}>
          </span>
        </div> 
         Systems Engineering
      </div>
      <div>
        <div style={styleInfoText}>
          <span className={`nf-md-mailbox`}
          style={{color: flavors.macchiato.colors.yellow.hex}}>
          </span>
        </div> 
         hmanzano1012@gmail.com
      </div>
      <div>
        <div style={styleInfoText}>
        <span className={`nf-md-phone_classic`}
          style={{color: flavors.macchiato.colors.lavender.hex}}>
        </span>
        </div> 
         503 7126 2384 
      </div>
      <div>
        <div style={styleInfoText}>
          <span className={`nf-fa-birthday_cake`}
             style={{color: flavors.macchiato.colors.blue.hex}}>
          </span>
        </div> 
         March 1, 2000
      </div>

      <div style={{textAlign:"center", marginTop:50}}>
        <Link href="https://github.com/HManzano1012" target="__blank">
          <span className="nf-fa-github_alt"
            style={{color: flavors.macchiato.colors.pink.hex}}>
          </span>
        </Link>
        <Link style={{marginLeft:20}} 
          href="https://www.instagram.com/hmanzano1012/" target="__blank">
          <span className="nf-md-instagram" 
            style={{color: flavors.macchiato.colors.red.hex}}>
          </span>
        </Link>
        <Link style={{marginLeft:20}} href="https://x.com/hmanzano1012"
          target="__blank">
          <span className="nf-fa-twitter_square" 
            style={{color: flavors.macchiato.colors.text.hex}}>
          </span>
        </Link>
        <Link style={{marginLeft:20}} 
          href="https://www.linkedin.com/in/harold-steve-manzano-154803145/"
          target="__blank">
          <span className="nf-fa-linkedin_square" 
            style={{color: flavors.macchiato.colors.sapphire.hex}}>
          </span>
        </Link>
      </div>
    </div>
  );
}
