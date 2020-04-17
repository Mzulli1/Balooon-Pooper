function voiceParser(transcript) {
  if (transcript == "hello") {
    speak(
      "Hey, How are you? Would you like some safety information concerning the coronavirus? You can say either staying home, going out or feeling ill to hear information regarding it"
    );
  } else if (transcript == "staying home") {
    speak(
      "When staying home you can do a lot to prevent getting coronavirus, like disinfecting all surfaces in your home. You can dilute bleach in water to help clean surfaces. Say more home for more tips regarding staying home"
    );
  } else if (transcript == "more home") {
    speak(
      " Always wash your hands when you come from outside or just avoid going out all together. Wash them for at least 20 seconds. Take vitamin c daily, it wont prevent coronavirus but it sure as hell helps to keep your immune system strong"
    );
  } else if (transcript == "going out") {
    speak(
      "If going out please wear a mask over your mouth at all times. If you need to cough or sneeze do so into your elbow dracula style. Dont make any contact with others. Say more going out for more information regarding so."
    );
  } else if (transcript == "more going out") {
    speak(
      "Stay at least 6 feet from any person. Always wash your hands after touching anything in public or wear gloves to avoid direct contact."
    );
  } else if (transcript == "feeling ill") {
    speak(
      "Sorry you are feeling ill, but dont worry everything will be ok. If your are experiencing a fever, hard breathing or a dry cough please go to your local test center and get tested. Avoid contact with everyone and please cover your mouth with a mask. Say more on feeling ill for more information"
    );
  } else if (transcript == "more on feeling ill") {
    speak(
      " Wash everything you come in contact with and make sure no one is exposed to your things. You should take caution to isolate yourself until your feeling better."
    );
  } else if (transcript == "bye") {
    speak(" You have a good one and remember stay safe!");
  } else {
    capturedText += transcript + " ";
  }
}
