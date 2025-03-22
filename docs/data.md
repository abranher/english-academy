# Categories and subcategories

### 1. Reading

- **Reading comprehension:** Exercises and texts to improve your reading comprehension at different levels.
- **Reading for pleasure:** Books, articles, and short stories to enjoy reading in English.
- **Academic reading:** Academic texts, research articles, and preparation for exams like IELTS and TOEFL.
- **Business reading:** Business documents, reports, emails, and articles related to the business world.
- **News articles:** Current news on various topics to practice reading informative texts.
- **Literature:** Classic and contemporary works of literature in English.

### 2. Writing

- **Essay writing:** Guidance and exercises for writing essays of different types and formats.
- **Report writing:** How to structure and write clear and concise reports.
- **Email writing:** Templates and tips for writing formal and informal emails.
- **Creative writing:** Develop your creativity by writing stories, poems, and other creative texts.
- **Business writing:** Master professional writing for emails, proposals, and presentations.
- **Academic writing:** Learn to write academic essays, research papers, and theses.

### 3. Listening

- **Listening comprehension:** Exercises to improve your listening comprehension of different accents and speeds.
- **Podcasts:** A wide selection of English podcasts on various topics.
- **Lectures:** Extracts from lectures and talks to practice understanding formal speeches.
- **Conversations:** Everyday dialogues and conversations in different contexts.
- **Movies and TV shows:** Scenes from movies and TV series with comprehension exercises.
- **Music:** English songs with lyrics and activities to improve pronunciation and vocabulary.

### 4. Speaking

- **Fluency practice:** Conversations with native teachers to improve fluency.
- **Pronunciation:** Exercises and activities to improve pronunciation of sounds and intonation.
- **Conversation skills:** Learn how to hold conversations in different situations.
- **Public speaking:** Preparation for presentations and public speeches.
- **Business presentations:** How to give effective presentations in a business setting.
- **Role-playing:** Simulations of real-life situations to practice spoken English.

### 5. Grammar

- **Verb tenses:** Detailed explanation of English verb tenses and practical exercises.
- **Sentence structure:** How to construct correct and varied sentences.
- **Parts of speech:** Nouns, adjectives, verbs, adverbs, and other parts of speech.
- **Punctuation:** Punctuation rules for correct writing.
- **Vocabulary building:** Strategies for expanding your vocabulary and learning new words.

### 6. Vocabulary

- **General vocabulary:** Common words and expressions used in everyday English.
- **Academic vocabulary:** Vocabulary specific to academic settings.
- **Business vocabulary:** Terms and expressions used in the business world.
- **Idioms and phrasal verbs:** English idioms and phrasal verbs.
- **Word formation:** How to form new words from roots and prefixes.

### 7. Culture

- **American culture:** Cultural aspects of the United States.
- **British culture:** Cultural aspects of the United Kingdom.
- **Australian culture:** Cultural aspects of Australia.
- **Canadian culture:** Cultural aspects of Canada.
- **Other cultures:** Cultural aspects of other English-speaking countries.


// mobile-payment.dto.ts
import { IsEnum, IsNumber, IsString, Matches, MinLength } from 'class-validator';
import { DocumentType, PhoneCode } from '@/types/enums';

export class CreateMobilePaymentDto {
  @IsEnum(PhoneCode, {
    message: 'Debe seleccionar un código de teléfono válido',
  })
  phoneCode: PhoneCode;

  @IsString()
  @Matches(/^\d{7}$/, { message: 'Debe ser un número de 7 dígitos' })
  phoneNumber: string;

  @IsEnum(DocumentType, {
    message: 'Debe seleccionar un tipo de documento válido',
  })
  documentType: DocumentType;

  @IsString()
  @MinLength(7, { message: 'Debe tener al menos 7 caracteres' })
  documentNumber: string;

  @IsString()
  @MinLength(1, { message: 'Debe seleccionar un banco' })
  bankId: string;
}