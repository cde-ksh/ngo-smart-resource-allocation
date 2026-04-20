def match_volunteers(request, volunteers):
    results = []

    for v in volunteers:
        score = 0

        if v.skill == request.skill:
            score += 50

        # add distance logic here
        # add availability logic here

        results.append((v, score))

    results.sort(key=lambda x: x[1], reverse=True)
    return results