from transformers import AutoModel, AutoTokenizer
import torch
from torch import nn
from warnings import filterwarnings
import os

os.chdir(os.path.dirname(__file__))
filterwarnings("ignore")

roberta_model = AutoModel.from_pretrained("FacebookAI/roberta-base")
tokenizer = AutoTokenizer.from_pretrained("FacebookAI/roberta-base")

class RoBERTaClassifier(nn.Module):
    def __init__(self, num_classes):
        super(RoBERTaClassifier, self).__init__()
        self.roberta = roberta_model  # Load RoBERTa model
        self.linear1 = nn.Linear(self.roberta.config.hidden_size, 512)  # First linear layer
        self.activation = nn.ReLU()  # Activation function
        self.linear2 = nn.Linear(512, num_classes)  # Second linear layer for classification

    def forward(self, input_ids, attention_mask):
#         print(input_ids)
        outputs = self.roberta(input_ids=input_ids, attention_mask=attention_mask)
#         print(outputs.device)
        last_hidden_state = outputs.last_hidden_state[:,0,:]
#         print(last_hidden_state.device)
        
        output = self.linear1(last_hidden_state)
#         print(output.device)
        output = self.activation(output)

        logits = self.linear2(output)

        return logits
    
class SentimentAnalysis:
    def __init__(self):
        self.model = RoBERTaClassifier(num_classes=4)
        self.model.load_state_dict(torch.load("./model/model.pth", map_location=torch.device('cpu')))
        self.model.eval()
        self.tokenizer = AutoTokenizer.from_pretrained("FacebookAI/roberta-base")
        
    def predict(self, input_text):
        with torch.inference_mode():
            inputs = self.tokenizer(input_text, return_tensors="pt")
            logits = self.model(**inputs)
            print(logits)
            prediction = torch.argmax(logits, dim=1).item()
        return prediction
    
if __name__ == "__main__":
    sa = SentimentAnalysis()
    text = input("Enter a text: ")
    sentiment_map = ['positive','negative','neutral','mixed']
    sentiment = sentiment_map[sa.predict(text)]
    print(f"Sentiment: {sentiment}")