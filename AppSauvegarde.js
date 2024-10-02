<template>
  <div class="articles-container">
    <h1>Liste des Articles</h1>
    <ul v-if="articles.length">
      <li v-for="article in articles" :key="article.id" class="article-item">
        <h2 class="article-title">{{ article.designation }}</h2>
        <span>{{ article.id }}</span>
        <p class="article-num">Numéro d'article: {{ article.numarticle }}</p>
        <p class="article-price">
          Prix de revient: <span class="price">{{ article.prixrevient }} €</span>
        </p>
        <p class="article-price">
          Prix unitaire: <span class="price">{{ article.prixunitaire }} €</span>
        </p>
        <img
          v-if="article.image"
          :src="getImageUrl(article.image)"
          alt="Image de l'article"
          class="article-image"
        />
      </li>
    </ul>
    <p v-else>Aucun article trouvé.</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

interface Article {
  id: number
  numarticle: string
  designation: string
  prixrevient: number
  prixunitaire: number
  image?: string // L'image est facultative
}

export default defineComponent({
  setup() {
    const articles = ref<Article[]>([])
    const error = ref<string | null>(null)

    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:4000/articles') // Remplacez par l'URL de votre API
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des articles')
        }
        const data = await response.json()
        articles.value = data // Assurez-vous que votre API renvoie un tableau d'articles
      } catch (err) {
        error.value = (err as Error).message
        console.error('Erreur:', err)
      }
    }

    // Fonction pour construire l'URL complète de l'image
    const getImageUrl = (imagePath: string) => {
      return `http://localhost:4000/uploads/${imagePath}` // Ajustez ce chemin en fonction de votre configuration de serveur
    }

    // Appel de la fonction pour récupérer les articles lorsque le composant est monté
    fetchArticles()

    return {
      articles,
      error,
      getImageUrl // Assurez-vous de renvoyer la fonction pour l'utiliser dans le template
    }
  }
})
</script>

<style scoped>
.articles-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #007bff;
}

.article-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  background-color: #fff;
  transition: transform 0.2s;
}

.article-item:hover {
  transform: scale(1.02);
}

.article-title {
  font-size: 1.5em;
  color: #333;
}

.article-num,
.article-price {
  font-size: 1.1em;
  margin: 5px 0;
}

.price {
  font-weight: bold;
  color: #28a745;
}

.article-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin-top: 10px;
}

.error {
  color: red;
  text-align: center;
  font-weight: bold;
}
</style>
