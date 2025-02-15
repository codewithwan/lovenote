# LoveNote

LoveNote is a customizable birthday greeting web page that displays a personalized message, animations, and images for a special someone.

## Features

- Personalized greeting message
- Animated text and images
- Customizable content via JSON response
- Responsive design

## Setup

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Open the `index.html` file in your preferred web browser.

## Customization

You can customize the content of the greeting page by modifying the `response.json` file. This file contains all the text and image paths used in the greeting page.

### Example `response.json`

```json
{
    "success": true,
    "description": "Response berisi teks yang dapat dikustomisasi untuk halaman ucapan ulang tahun.",
    "data": {
      "recipient_name": "Haerin",
      "greeting_text": "Selamat ulang tahun cintaku! Semoga hari ini penuh kebahagiaan dan cinta. 💖🎉",
      "main_message": "Aku bersyukur setiap hari bisa bersamamu. Kamu adalah anugerah terindah dalam hidupku. 😘",
      "chatbox_message": "Aku cinta kamu lebih dari kata-kata bisa ungkapkan. 💕",
      "ideas": [
        "Hari ini spesial karena...",
        "Kamu lahir ke dunia! 🥰🥰",
        "Aku ingin membuat hari ini tak terlupakan dan penuh cinta. ❤️",
        "Karena...",
        "Kamu yang terbaik di hidupku! 😍"
      ],
      "wish": {
        "title": "Selamat Ulang Tahun!",
        "text": "Aku harap semua impianmu jadi kenyataan. Aku akan selalu ada di sisimu, sekarang dan selamanya. "
      },
      "replay_message": "Klik di sini kalau mau lihat lagi kejutan ini! 🎉",
      "last_smile": ":)",
      "image_path": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaq5GTEL16CIR_odMTXYXCs3N-B1WZN78u_g&s",
      "nine_message": "Terima kasih telah menjadi bagian dari hidupku. Aku mencintaimu lebih dari yang bisa aku ungkapkan. 💖",
      "assets": {
        "balloons": [
          "img/balloon.svg",
          "img/heart.svg",
          "img/smiling.svg"
        ],
        "music_notes": [
          "img/music-note.svg"
        ]
      }
    }
  }
```

## Usage

1. Open the `index.html` file in your web browser.
2. The page will fetch the content from `response.json` and display the personalized greeting with animations.

## License

This project is licensed under the MIT License.
````