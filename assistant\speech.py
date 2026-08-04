import speech_recognition as sr


class SpeechRecognizer:

    def __init__(self):
        self.recognizer = sr.Recognizer()

    def listen(self):
        """
        Listen to microphone and return recognized text.
        """

        with sr.Microphone() as source:

            print("Listening...")

            self.recognizer.adjust_for_ambient_noise(source, duration=1)

            audio = self.recognizer.listen(
                source,
                timeout=5,
                phrase_time_limit=8
            )

        try:

            print("Recognizing...")

            text = self.recognizer.recognize_google(audio)

            print("You :", text)

            return text.lower()

        except sr.UnknownValueError:

            return "I could not understand your voice."

        except sr.RequestError:

            return "Speech Recognition service is unavailable."

        except sr.WaitTimeoutError:

            return "No voice detected."

        except Exception as e:

            return f"Error : {str(e)}"


if __name__ == "__main__":

    speech = SpeechRecognizer()

    while True:

        command = speech.listen()

        print(command)

        if command == "exit":
            break
