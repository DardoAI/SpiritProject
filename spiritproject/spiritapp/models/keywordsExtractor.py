from keybert import KeyBERT

# Initialize KeyBERT with a multilingual model
kw_model = KeyBERT('paraphrase-multilingual-MiniLM-L12-v2')

def main(prompt):
    output = kw_model.extract_keywords(
        prompt,
        keyphrase_ngram_range=(0, 1),  # Allows single words and bigrams
        top_n=3
    )
    keywords = [e[0] for e in output]
    print(keywords)
    return keywords





