import React, { useState } from "react";
import QRCodeStyling, { DotType } from "qr-code-styling";

const presets = {
  mastodon: {
    dotColor: "#563ACC",
    dotType: "rounded",
    backgroundColor: "#e9ebee",
    imageOption: "mastodon",
    imageMargin: 3,
    customImageUrl: "",
  },
  misskey: {
    dotColor: "#76a002",
    dotType: "rounded",
    backgroundColor: "#e9ebee",
    imageOption: "misskey",
    imageMargin: 3,
    customImageUrl: "",
  },
};

const App: React.FC = () => {
  const [url, setUrl] = useState<string>("");

  const [dotColor, setDotColor] = useState<string>("#4267b2");
  const [dotType, setDotType] = useState<string>("rounded");
  const [backgroundColor, setBackgroundColor] = useState<string>("#e9ebee");
  const [imageMargin, setImageMargin] = useState<number>(20);
  const [imageOption, setImageOption] = useState<string>("none");
  const [customImageUrl, setCustomImageUrl] = useState<string>("");
  const [showCustomOptions, setShowCustomOptions] = useState(false);

  const applyPreset = (preset: typeof presets.mastodon) => {
    setDotColor(preset.dotColor);
    setDotType(preset.dotType);
    setBackgroundColor(preset.backgroundColor);
    setImageOption(preset.imageOption);
    setImageMargin(preset.imageMargin);
    setCustomImageUrl(preset.customImageUrl);
  };
  const toggleCustomOptions = () => {
    setShowCustomOptions((prevState) => !prevState);
  };

  const generateQRCode = () => {
    let selectedImage: string | undefined;

    if (imageOption === "mastodon") {
      selectedImage = "image/mastodon.svg";
    } else if (imageOption === "misskey") {
      selectedImage = "image/misskey.png";
    } else if (imageOption === "custom") {
      selectedImage = customImageUrl;
    }

    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      data: url,
      image: selectedImage,
      dotsOptions: {
        color: dotColor,
        type: dotType as DotType,
      },
      backgroundOptions: {
        color: backgroundColor,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: imageMargin,
      },
    });

    const container = document.getElementById("qr-container");
    if (container) {
      container.innerHTML = "";
      qrCode.append(container);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          QRコードジェネレーター For Fediverse
        </h1>
        <h2 className="text-xl font-bold">URLを入力</h2>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/@example"
          className="w-full mt-2 mb-4 p-2 border rounded-md"
        />
        {/* プリセットの選択 */}
        <h2 className="text-xl font-bold mb-2">プリセットの選択</h2>
        <div className="mb-4">
          <button
            onClick={() => applyPreset(presets.mastodon)}
            className="mr-2 px-4 py-2 bg-mastodon-500 text-white rounded hover:bg-mastodon-600"
          >
            Mastodon
          </button>
          <button
            onClick={() => applyPreset(presets.misskey)}
            className="mr-2 px-4 py-2 bg-misskey-500 text-white rounded hover:bg-misskey-600"
          >
            Misskey
          </button>
          <button
            onClick={toggleCustomOptions}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            カスタム
          </button>
        </div>
        {/* カスタムオプションの表示 (条件付きレンダリング) */}
        {showCustomOptions && (
          <div>
            <h2 className="text-xl font-bold mb-2">QRコード内の画像</h2>
            <select
              value={imageOption}
              onChange={(e) => setImageOption(e.target.value)}
              className="w-full mb-2 p-2 border rounded-md"
            >
              <option value="none">画像なし</option>
              <option value="mastodon">Mastodon</option>
              <option value="misskey">Misskey</option>
              <option value="custom">カスタム画像URL</option>
            </select>

            {imageOption === "custom" && (
              <input
                type="text"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="https://example.com/image.png"
                className="w-full mb-2 p-2 border rounded-md"
              />
            )}

            <h2 className="text-xl font-bold mb-2">画像とQRコードの余白</h2>
            <input
              type="number"
              value={imageMargin}
              onChange={(e) => setImageMargin(Number(e.target.value))}
              placeholder="マージン"
              className="w-full mb-2 p-2 border rounded-md"
            />
            <div className="flex space-x-4">
              <h2 className="text-xl font-bold mb-2">ドットの色</h2>
              <input
                type="color"
                value={dotColor}
                onChange={(e) => setDotColor(e.target.value)}
                placeholder="ドットの色"
                className="mb-2"
              />
              <h2 className="text-xl font-bold mb-2">背景色</h2>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                placeholder="背景色"
                className="mb-4"
              />
            </div>
            <h2 className="text-xl font-bold mb-2">ドットの形</h2>
            <select
              value={dotType}
              onChange={(e) => setDotType(e.target.value)}
              className="w-full mb-2 p-2 border rounded-md"
            >
              <option value="square">正方形</option>
              <option value="rounded">丸</option>
            </select>
          </div>
        )}

        <div
          className="bg-blue-100 border border-blue-400 text-blue-700 mt-4 mb-4 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">
            生成したQRコードはスマホの場合長押しで、PCの場合は右クリックから「名前を付けて画像を保存」で保存をすることができます。
          </span>
        </div>
        <button
          onClick={generateQRCode}
          className="w-full mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          QRコードを生成
        </button>

        <div className="flex justify-center mt-4">
          <div id="qr-container"></div>
        </div>
        <div className="flex justify-center">
          <a
            href="https://github.com/naaaaaaaaaaaf/FediQRGen"
            target="_blank"
            rel="noreferrer"
            className="mt-4 text-gray-500 hover:underline flex items-center"
          >
            ソースコード
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
