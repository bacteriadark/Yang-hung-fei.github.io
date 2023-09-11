import { profile_els } from "../../../js/getUserProfile";
import { getUserProfile } from "../../../js/getUserProfile";
import base64Data from "./userPicture";

const saveButtons = document.querySelectorAll(".save");
saveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sentEditedData(); // 调用发送 API 请求的函数
  });
});

userNameElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    // 在这里触发保存操作
  }
});

function editUserNickName() {
  const userNickNameElement = profile_els().userNickName;

  userNickNameElement.addEventListener("input", (event) => {
    // 在这里处理用户昵称的修改
  });

  userNickNameElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // 在这里触发保存操作
    }
  });
}

$(document).ready(function () {
  $("#userPicEdit").on("click", () => {
    console.log(111);
  });
});

// 當用戶選擇文件時觸發事件
fileInput.addEventListener("change", (event) => {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    //TODO: 放回頁面呈現
    // 這裡你可以處理用戶選擇的文件，例如顯示在圖片元素中
    const reader = new FileReader();
    reader.onload = (e) => {
      userPicImage.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  }
});

function sentEditedData() {
  const token = localStorage.getItem("Authorization_U");
  const newUserData = getEditedData();

  fetch(config.url + "/user/profile", {
    method: "POST",
    headers: {
      Authorization_U: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 200) {
        console.log("code", code, ":", data.message);
        swal("修改成功", "", "success");
      } else {
        console.log("code", code, ":", data.message);
        swal("修改失敗", "請確認資料格式");
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

function getEditedData() {
  const editedData = {
    userName: profile_els().userName.value,
    userNickName: profile_els().userNickName.value,
    // ... 其他需要编辑的数据字段
  };
  return editedData;
}
