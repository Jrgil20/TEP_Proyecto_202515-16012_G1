import { Request, Response } from 'express';
import axios from 'axios';

// Requirement 1: GET joke by type (Chuck, Dad, or Propio)
export const getJoke = async (req: Request, res: Response) => {
  const { type } = req.params;

  try {
    switch (type) {
      case 'Chuck':
        const chuckResponse = await axios.get('https://api.chucknorris.io/jokes/random');
        return res.json({ joke: chuckResponse.data.value });

      case 'Dad':
        const dadResponse = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' },
        });
        return res.json({ joke: dadResponse.data.joke });

      case 'Propio':
        // Simulamos un chiste propio ya que no tenemos base de datos en este ejemplo
        return res.json({ joke: 'Este es un chiste propio de ejemplo.' });

      default:
        return res.status(400).json({ message: 'Invalid joke type' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching joke', error });
  }
};
