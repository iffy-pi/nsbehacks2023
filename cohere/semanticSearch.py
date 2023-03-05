#title Import libraries (Run this cell to execute required code) {display-mode: "form"}

import cohere
import numpy as np
import re
import pandas as pd
from tqdm import tqdm
from datasets import load_dataset
import umap
import altair as alt
from sklearn.metrics.pairwise import cosine_similarity
from annoy import AnnoyIndex
import warnings
warnings.filterwarnings('ignore')
pd.set_option('display.max_colwidth', None)

# Get dataset
dataset = load_dataset("trec", split="train")
# Import into a pandas dataframe, take only the first 1000 rows
df = pd.DataFrame(dataset)[:1000]
# Preview the data to ensure it has loaded correctly
df.head(10)

#API key here
api_key = '4PZP9x5KzI3ShJ2byf5Sw5uVPAeVTaNsDrzCljuH'

# Create and retrieve a Cohere API key from dashboard.cohere.ai/welcome/register
co = cohere.Client(api_key)

# Get the embeddings
embeds = co.embed(texts=list(df['text']),
                  model='large').embeddings

# Create the search index, pass the size of embedding
search_index = AnnoyIndex(embeds.shape[1], 'angular')
# Add all the vectors to the search index
for i in range(len(embeds)):
    search_index.add_item(i, embeds[i])
search_index.build(10) # 10 trees
search_index.save('test.ann')

# Choose an example (we'll retrieve others similar to it)
example_id = 92
# Retrieve nearest neighbors
similar_item_ids = search_index.get_nns_by_item(example_id,10,
                                                include_distances=True)
# Format and print the text and distances
results = pd.DataFrame(data={'texts': df.iloc[similar_item_ids[0]]['text'],
                             'distance': similar_item_ids[1]}).drop(example_id)
print(f"Question:'{df.iloc[example_id]['text']}'\nNearest neighbors:")
results