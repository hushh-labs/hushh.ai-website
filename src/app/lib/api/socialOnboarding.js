const BASE_URL = "https://hushh-techh.onrender.com/api/hushh";

async function handleJsonResponse(response) {
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `Request failed with ${response.status}`);
  }
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return null;
}

export async function saveUserData(payload) {
  const res = await fetch(`${BASE_URL}/user-data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleJsonResponse(res);
}

export async function uploadImages({ email, files }) {
  const form = new FormData();
  form.append("email", email);
  files.forEach((file) => {
    if (file) form.append("images", file);
  });
  const res = await fetch(`${BASE_URL}/upload-images`, {
    method: "POST",
    body: form,
  });
  return handleJsonResponse(res);
}

export async function saveUserSocials({ email, instagram_id, linkedin_id, twitter_id, facebook_id }) {
  const res = await fetch(`${BASE_URL}/user-socials`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, instagram_id, linkedin_id, twitter_id, facebook_id }),
  });
  return handleJsonResponse(res);
}

export async function savePreferences({ email, answers }) {
  const res = await fetch(`${BASE_URL}/save-preferences`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, answers }),
  });
  return handleJsonResponse(res);
}

export async function getPreferenceQuestionnaire() {
  const res = await fetch(`${BASE_URL}/preference-question`, {
    method: "GET",
  });
  return handleJsonResponse(res);
}

export async function getUserDetails(email) {
  // Call our local proxy to satisfy upstream expectation (GET with JSON body)
  const res = await fetch(`/api/hushh/user-details`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return handleJsonResponse(res);
}

export function buildPreferencesPayload(state) {
  return {
    sections: [
      {
        title: "Habits and Lifestyle",
        questions: [
          { id: "smoke", text: "Do you smoke?", type: "text", answer: state.smoke || "" },
          { id: "alcohol", text: "Do you drink alcohol?", type: "text", answer: state.drink || "" },
          { id: "exercise", text: "How often do you exercise?", type: "text", answer: state.exercise || "" },
          { id: "wake_time", text: "What time do you usually wake up?", type: "text", answer: state.wake || "" },
          { id: "day_type", text: "Are you more of a morning or night person?", type: "choice", options: ["Morning", "Night"], answer: state.mornight || "" },
          { id: "diet", text: "What's your diet like?", type: "text", answer: state.diet || "" },
        ],
      },
      {
        title: "Beliefs and Virtues",
        questions: [
          { id: "political_beliefs", text: "What are your political beliefs?", type: "text", answer: state.political || "" },
          { id: "religion_importance", text: "How important is religion to you?", type: "text", answer: state.religion || "" },
          { id: "social_life", text: "What kind of social life do you enjoy?", type: "text", answer: state.sociallife || "" },
          { id: "personality", text: "Are you an introvert or extrovert?", type: "choice", options: ["Introvert", "Extrovert", "Ambivert"], answer: state.introextro || "" },
        ],
      },
      {
        title: "Fashion",
        questions: [
          { id: "brands", text: "What clothing brands do you usually shop from?", type: "text", answer: state.brands || "" },
          { id: "shopping_pref", text: "Do you prefer shopping online or in-store?", type: "choice", options: ["Online", "In-store", "Both"], answer: state.shopmode || "" },
          { id: "style", text: "How would you describe your style?", type: "text", answer: state.style || "" },
          { id: "brand_choice", text: "What matters most to you when choosing a brand?", type: "text", answer: state.brandmatters || "" },
        ],
      },
      {
        title: "Interests and Hobbies",
        questions: [
          { id: "top_hobbies", text: "What are your top 3 hobbies?", type: "text", answer: state.tophobbies || "" },
          { id: "new_hobby", text: "What's a hobby you've recently picked up?", type: "text", answer: state.newhobby || "" },
        ],
      },
      {
        title: "Travel",
        questions: [
          { id: "travel_love", text: "Do you like to travel?", type: "choice", options: ["Yes", "No", "Sometimes"], answer: state.liketravel || "" },
          { id: "travel_preference", text: "Are you more of a beach or mountains person?", type: "choice", options: ["Beach", "Mountains", "Both"], answer: state.beachmountain || "" },
        ],
      },
    ],
  };
}

export default {
  saveUserData,
  uploadImages,
  saveUserSocials,
  savePreferences,
  getPreferenceQuestionnaire,
  buildPreferencesPayload,
};


