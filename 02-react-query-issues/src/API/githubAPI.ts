import axios from "axios";


export const githubAPI = axios.create({
    baseURL:'https://api.github.com/repos/facebook/react',
    headers: {
        Authorization:'Bearer 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'
    }
});